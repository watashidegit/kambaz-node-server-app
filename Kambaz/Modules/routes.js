import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {

    // remove the module, if successful, return status 204
    app.delete("/api/modules/:moduleId", async (req, res) => {
      const { moduleId } = req.params;
      const status = await modulesDao.deleteModule(moduleId);
      res.send(status);
    });

    // apply update, return status 204 if successful
    app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const status = await modulesDao.updateModule(moduleId, moduleUpdates);
        res.send(status);
    });
    
}
   
