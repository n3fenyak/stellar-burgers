import ingredientsReducer, { fetchIngredients } from './ingredients-slice';

import { TIngredient } from '../../utils/types';

const ingredient: TIngredient = {
  _id: 'ingredient-1',
  name: 'Булка',
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

describe('ingredientsSlice reducer', () => {
  test('возвращает initialState для неизвестного action', () => {
    expect(
      ingredientsReducer(undefined, {
        type: 'UNKNOWN'
      })
    ).toEqual({
      items: [],
      isLoading: false,
      error: null
    });
  });

  test('обрабатывает fetchIngredients.pending', () => {
    const action = {
      type: fetchIngredients.pending.type
    };

    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      items: [],
      isLoading: true,
      error: null
    });
  });

  test('обрабатывает fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [ingredient]
    };

    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      items: [ingredient],
      isLoading: false,
      error: null
    });
  });

  test('обрабатывает fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: {
        message: 'Ошибка загрузки'
      }
    };

    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
