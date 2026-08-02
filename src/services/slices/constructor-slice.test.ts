import constructorReducer, {
  addIngredient,
  clearConstructor,
  moveIngredient,
  removeIngredient
} from './constructor-slice';

import { TConstructorIngredient, TIngredient } from '../../utils/types';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Тестовая булка',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'bun.png',
  image_mobile: 'bun-mobile.png',
  image_large: 'bun-large.png'
};

const firstIngredient: TConstructorIngredient = {
  _id: 'main-1',
  id: 'constructor-main-1',
  name: 'Первая начинка',
  type: 'main',
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 200,
  image: 'main-1.png',
  image_mobile: 'main-1-mobile.png',
  image_large: 'main-1-large.png'
};

const secondIngredient: TConstructorIngredient = {
  _id: 'main-2',
  id: 'constructor-main-2',
  name: 'Вторая начинка',
  type: 'main',
  proteins: 30,
  fat: 30,
  carbohydrates: 30,
  calories: 300,
  price: 300,
  image: 'main-2.png',
  image_mobile: 'main-2-mobile.png',
  image_large: 'main-2-large.png'
};

describe('constructorSlice reducer', () => {
  test('возвращает начальное состояние для неизвестного экшена', () => {
    const result = constructorReducer(undefined, {
      type: 'UNKNOWN'
    });

    expect(result).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('добавляет булку', () => {
    const result = constructorReducer(undefined, addIngredient(bun));

    expect(result.bun).toEqual(
      expect.objectContaining({
        ...bun,
        id: expect.any(String)
      })
    );

    expect(result.ingredients).toEqual([]);
  });

  test('добавляет начинку', () => {
    const result = constructorReducer(
      undefined,
      addIngredient(firstIngredient)
    );

    expect(result.bun).toBeNull();

    expect(result.ingredients).toHaveLength(1);

    expect(result.ingredients[0]).toEqual(
      expect.objectContaining({
        ...firstIngredient,
        id: expect.any(String)
      })
    );
  });

  test('удаляет начинку по id', () => {
    const initialState = {
      bun: null,
      ingredients: [firstIngredient, secondIngredient]
    };

    const result = constructorReducer(
      initialState,
      removeIngredient(firstIngredient.id)
    );

    expect(result.ingredients).toEqual([secondIngredient]);
  });

  test('перемещает начинку', () => {
    const initialState = {
      bun: null,
      ingredients: [firstIngredient, secondIngredient]
    };

    const result = constructorReducer(
      initialState,
      moveIngredient({
        fromIndex: 0,
        toIndex: 1
      })
    );

    expect(result.ingredients).toEqual([secondIngredient, firstIngredient]);
  });

  test('очищает конструктор', () => {
    const initialState = {
      bun: {
        ...bun,
        id: 'constructor-bun'
      },
      ingredients: [firstIngredient, secondIngredient]
    };

    const result = constructorReducer(initialState, clearConstructor());

    expect(result).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
