import logger from 'utils/logger';
import { CronJob } from 'cron';
import { UserCharacterService } from './UserCharacterService';

export default class CronJobService {
  public static start() {
    this.increaseStaminaJob();
    this.adjustStaminaJob();
  }

  private static increaseStaminaJob() {
    new CronJob(
      '0 */4 * * * *',
      async () => {
        logger.info('Increase stamina every 4 minutes');
        try {
          await UserCharacterService.increaseStamina();
          logger.info('Stamina updated successfully for all users');
        } catch (error) {
          logger.error('Error updating stamina:', error);
        }
      },
      'America/Sao_Paulo'
    ).start();
  }

  private static adjustStaminaJob() {
    new CronJob(
      '0 */2 * * * *',
      async () => {
        logger.info('Adjust stamina if exceeds max every 2 minutes');
        try {
          await UserCharacterService.adjustStaminaIfExceedsMax();
          logger.info('Stamina adjusted successfully for all users');
        } catch (error) {
          logger.error('Error adjusting stamina:', error);
        }
      },
      'America/Sao_Paulo'
    ).start();
  }
}
