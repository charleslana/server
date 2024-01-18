import IPage from 'interface/IPage';
import IResultPaginated from 'interface/IResultPaginated';
import NewspaperModel from 'model/NewspaperModel';
import UserModel from 'model/UserModel';

export class NewspaperRepository {
  private constructor() {}

  public static async save(newspaper: NewspaperModel): Promise<NewspaperModel> {
    const savedNewspaper = await newspaper.save();
    return savedNewspaper;
  }

  public static async findById(id: number): Promise<NewspaperModel | null> {
    const newspaper = await NewspaperModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['fullName'],
        },
      ],
    });
    return newspaper;
  }

  public static async findAllPaginated(page: IPage): Promise<IResultPaginated<NewspaperModel>> {
    const offset = (page.page - 1) * page.pageSize;
    const limit = page.pageSize;
    const findAllPaginated = await NewspaperModel.findAndCountAll({
      offset,
      limit,
      order: [['id', 'DESC']],
    });
    const totalPages = Math.ceil(findAllPaginated.count / page.pageSize);
    const hasNextPage = page.page < totalPages;
    return {
      results: findAllPaginated.rows,
      totalCount: findAllPaginated.count,
      totalPages: totalPages,
      currentPage: page.page,
      hasNextPage: hasNextPage,
    };
  }

  public static async update(character: NewspaperModel): Promise<NewspaperModel> {
    const updatedNewspaper = await character.save();
    return updatedNewspaper;
  }

  public static async delete(id: number): Promise<number> {
    const deletedCount = await NewspaperModel.destroy({ where: { id } });
    return deletedCount;
  }
}
