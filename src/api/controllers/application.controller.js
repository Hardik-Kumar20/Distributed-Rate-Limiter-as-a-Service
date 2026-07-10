const applicationRepo = require("../repositories/application.repository");

module.exports = {
    async createApplication(applicationData){
        const application = await applicationRepo.create(applicationData);
        return application;
    },

    async findAll(owner_id){
        const apps = await applicationRepo.findAll(owner_id);
        return apps;
    },

    async findById(id){
        const app = await applicationRepo.findById(id);
        return app;
    },

    async deleteApp(id, owner_id){
        const app = await applicationRepo.deleteApp(id, owner_id);
        return app;
    }
}
