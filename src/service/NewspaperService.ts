import HandlerError from 'handler/HandlerError';
import HandlerSuccess from 'handler/HandlerSuccess';
import IPage from 'interface/IPage';
import IResultPaginated from 'interface/IResultPaginated';
import NewspaperModel from 'model/NewspaperModel';
import { ICreateNewspaper, IUpdateNewspaper } from 'interface/INewspaper';
import { NewspaperRepository } from 'repository/NewspaperRepository';

export class NewspaperService {
  private constructor() {}

  public static async create(createNewspaper: ICreateNewspaper): Promise<HandlerSuccess> {
    const newspaperModel = new NewspaperModel();
    newspaperModel.title = createNewspaper.title;
    newspaperModel.description = createNewspaper.description;
    newspaperModel.userId = createNewspaper.userId;
    await NewspaperRepository.save(newspaperModel);
    return new HandlerSuccess('Jornal cadastrado com sucesso.', 201);
  }

  public static async get(id: number): Promise<NewspaperModel> {
    const newspaper = await NewspaperRepository.findById(id);
    if (!newspaper) {
      throw new HandlerError('Jornal não encontrado.', 404);
    }
    return newspaper;
  }

  public static async getAllPaginated(page: IPage): Promise<IResultPaginated<NewspaperModel>> {
    const newspapers = await NewspaperRepository.findAllPaginated(page);
    return newspapers;
  }

  public static async update(updateNewspaper: IUpdateNewspaper): Promise<HandlerSuccess> {
    const findNewspaper = await this.get(updateNewspaper.id);
    findNewspaper.title = updateNewspaper.title;
    findNewspaper.description = updateNewspaper.description;
    findNewspaper.userId = updateNewspaper.userId;
    await NewspaperRepository.update(findNewspaper);
    return new HandlerSuccess('Jornal atualizado com sucesso.');
  }

  public static async delete(id: number): Promise<HandlerSuccess> {
    await this.get(id);
    await NewspaperRepository.delete(id);
    return new HandlerSuccess('Jornal excluído com sucesso.');
  }
}
