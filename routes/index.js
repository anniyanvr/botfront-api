'use strict';
const express = require('express');
const {
    getResponseByName,
    responseByNameValidator,
    getAllResponses,
    allResponsesValidator,
    nlg,
    nlgValidator,
} = require('../server/templates/templates.controller');

const utteranceCtrl = require('../server/activity/activity.controller');
const { getSenderEventCount, insertConversation, updateConversation } = require('./conversations');
const { getProjectCredentials } = require('../server/credentials/credentials.controller');
const { getProjectEndpoints } = require('../server/endpoints/endpoints.controller');
const { getPublishedModels } = require('../server/nlu_models/nlu_models.controller');

let router = express.Router();

/* legacy routes */
router.get(
    '/project/:project_id/template/key/:name/lang/:lang',
    responseByNameValidator, getResponseByName,
);
router.get(
    '/project/:project_id/response/name/:name/lang/:lang',
    responseByNameValidator, getResponseByName,
);
router.get('/project/:project_id/responses', allResponsesValidator, getAllResponses);
router.post('/log-utterance', utteranceCtrl.create);

/* */

router.post('/project/:project_id/nlg', nlgValidator, nlg);

router.get('/project/:project_id/conversations/:sender_id/:event_count', getSenderEventCount);
router.post('/project/:project_id/conversations/:sender_id/insert', insertConversation);
router.post('/project/:project_id/conversations/:sender_id/update', updateConversation);

router.get('/project/:project_id/credentials/:environment?/', getProjectCredentials);
router.get('/project/:project_id/endpoints/:environment?/', getProjectEndpoints);

router.get('/project/:project_id/models/published', getPublishedModels);
router.get('/health-check', (req, res) => res.status(200).json());

module.exports = router;
