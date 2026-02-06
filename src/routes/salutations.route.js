import express from 'express';
import { obtenirListeSalutations, obtenirListeSalutationHasard, creerSalutation } from '../controllers/salutations.controller.js';
const router = express.Router();

router.get('/liste', obtenirListeSalutations);

router.get('/hasard', obtenirListeSalutationHasard);

router.post('/', creerSalutation);

export default router;