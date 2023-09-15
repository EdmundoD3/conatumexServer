const router = require("express").Router()

const cliente = require('./customer.js')
const compra = require('./compra.js')

router.use('/cliente', cliente)
router.use('/compra', compra)

module.exports = router