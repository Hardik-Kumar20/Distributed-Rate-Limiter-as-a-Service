const applicationRepo = require("../repositories/application.repository");

module.exports = {
    async createApplication(name, owner_id, plan){
        const application = await applicationRepo.create(name, owner_id, plan);
        return application;
    },

    async findAll(){
        const apps = await applicationRepo.findAll();
        return apps;
    },

    async findById(id){
        const app = await applicationRepo.findById(id);
        return app;
    },

    async deleteApp(id){
        const app = await applicationRepo.deleteApp(id);
        return app;
    }
}
