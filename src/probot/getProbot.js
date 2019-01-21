const { createProbot } = require('probot')
const { findPrivateKey } = require('probot/lib/private-key')

let probot

function getProbot() {
    probot =
        probot ||
        createProbot({
            id: process.env.APP_ID,
            secret: process.env.WEBHOOK_SECRET,
            cert: findPrivateKey(),
        })

    if (process.env.SENTRY_DSN) {
        probot.load(require('probot/lib/apps/sentry'))
    }

    return probot
}

module.exports = getProbot
