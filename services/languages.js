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

module.exports = {
    getMultiple
}