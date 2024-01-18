import logger from 'utils/logger';
import { CronJob } from 'cron';
import { UserCharacterService } from './UserCharacterService';

export default class CronJobService {
  public static start() {
    this.increaseStaminaJob();
    this.secondJob();
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

  private static secondJob() {
    new CronJob(
      '0 */2 * * * *',
      async () => {
        try {
          logger.info('Second job in 2 minutes');
        } catch (error) {
          logger.error('Second job in 2 minutes error:', error);
        }
      },
      'America/Sao_Paulo'
    ).start();
  }
}
