import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, Item, PublicItem } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('/items', () => {
    it('should return publicItems', () => {
      jest.spyOn(appService, 'getPublicItems').mockImplementation(() => {
        const item: PublicItem = {
          id: 1,
          title: 'Mock Title',
          body: 'Mock Body',
        };
        return [item, item];
      });
      expect(appController.getItems()).toHaveLength(2);
    });
  });
});
