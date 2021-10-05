

const AuthController = require('./AuthController');
const ConditionsController = require('./ConditionsController');
const LocationsController = require('./LocationsController');
const TrackingsController = require('./TrackingsController');
const UsersController = require('./UsersController');
const ChatsController = require('./ChatsController');

// logs

module.exports = {
    ...AuthController,
    ...ConditionsController,
    ...LocationsController,
    ...TrackingsController,
    ...UsersController,
    ...ChatsController

    //logs
}