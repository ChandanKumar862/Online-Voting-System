import express from 'express'
const router=express.Router()

import {getAllElections} from '../controllers/electionController.js'

router.get('/',getAllElections)

export default router