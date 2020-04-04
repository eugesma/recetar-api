
import { Router } from 'express';
import { passportMiddlewareLocal, passportMiddlewareJwt } from '../middlewares/passport-config.middleware';
// interfaces
import { BaseController } from '../interfaces/classes/base-controllers.interface';
// controllers
import authController from '../controllers/auth.controller';
import patientController from '../controllers/patient.controller';
import pharmacistController from '../controllers/pharmacist.controller';
import professionalController from '../controllers/professional.controller';
import pharmacyController from '../controllers/pharmacy.controller';

class Routes {
	router: Router;

	constructor(){
		this.router = Router();
		this.routesDefinition();
	}

	routesDefinition(): void{
    // auth
		this.router.post('/auth/register', authController.register);
		this.router.post('/auth/login', passportMiddlewareLocal, authController.login);
    this.router.post('/auth/refresh', authController.refresh);
    this.resources('patients', patientController);
    this.resources('pharmacists', pharmacistController);
    this.router.get('pharmacists/getByEnrollment/:enrollment', pharmacistController.getByEnrollment)
    this.resources('professionals', professionalController);
    this.resources('pharmacies', pharmacyController);
  }

  // resources function make easy generates CRUD routes
  // the controller param should implements BaseContrller interface.
  resources(entity: string, controller: BaseController, middelware?: string | [] ): void{
    this.router.get(`/${entity}/`, controller.index);
    this.router.post(`/${entity}/`, controller.create);
		this.router.get(`/${entity}/:id`, controller.show);
    this.router.put(`/${entity}/:id`, controller.update);
    this.router.delete(`/${entity}/:id`, controller.delete);
  }
}

const routes = new Routes();
export default routes.router;
