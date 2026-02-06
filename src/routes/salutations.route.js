import express from 'express';
import { getSalutationsListe, creerSalutation, getSalutationsLangue } from '../controllers/salutations.controller.js';
const router = express.Router();

router.get('/liste', getSalutationsListe);

router.get('/liste_pour_langue/:code_langue', getSalutationsLangue)

router.post('/', creerSalutation);

export default router;