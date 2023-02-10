const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
    const offset = helper.getOffSet(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM  programming_languages LIMIT ${offset},${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data, meta
    }
}

async function create(language) {
    const result = await db.query(
        `INSERT INTO programming_languages (name, released_year, githut_rank, pypl_rank, tiobe_rank) VALUES
        (${language.name}, ${language.released_year}, ${language.githut_rank}, ${language.pypl_rank}, ${language.tiobe_rank})`
    );

    let message = 'Error in creating new langauge.';

    if (result.affectedRows) {
        message = 'New language created successfully.';
    }

    return {message};
}

async function update(id, language) {
    const result = await db.query(
        `UPDATE programming_languages SET name="${language.name}", released_year=${language.released_year}, githut_rank=${language.githut_rank},
        pypl_rank=${language.pypl_rank}, tiobe_rank=${language.tiobe_rank}) WHERE id=${id}`
    );

    let message = 'Error in updating langauge.';

    if (result.affectedRows) {
        message = 'Language updated successfully.';
    }

    return {message};
}

module.exports = {
    getMultiple,
    create,
    update
}