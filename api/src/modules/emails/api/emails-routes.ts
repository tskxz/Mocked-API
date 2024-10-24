import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { getRandomEmails } from '../utils/getRandomEmails';
import {getRandomEmailByUsername} from "../utils/getRandomEmailByUsername";

const defaultEmailCount = 10;

module.exports = function (app: core.Express) {
    /**
     * @openapi
     * '/emails':
     *   get:
     *     tags:
     *     - Emails
     *     summary: Returns a list of emails
     *     responses:
     *       '200':
     *         description: OK
     *         schema:
     *           $ref: '#/definitions/MockEmails'
     */
    app.get('/emails', (req: Request, res: Response) => {
        res.json(getRandomEmails(defaultEmailCount));
    });

    /**
     * @openapi
     * '/email':
     *   get:
     *     tags:
     *     - Email
     *     summary: Returns a movk of email using first and last name
     *     parameters:
     *       - in: query
     *         name: firstName
     *         required: true
     *         schema:
     *           type: string
     *         description: The first name of the user
     *       - in: query
     *         name: lastName
     *         required: true
     *         schema:
     *           type: string
     *         description: The last name of the user
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/definitions/MockEmails'
     *       '400':
     *         description: Bad Request
     *         content:
     *           application/json:
     */

    app.get('/emails/address', (req: Request, res: Response) => {
        const firstName = req.query.firstName as string;
        const lastName = req.query.lastName as string;
        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'firstName and lastName are required' });
        }
        res.json(getRandomEmailByUsername( firstName.toLowerCase(), lastName.toLowerCase()));
    });
};
