import { mount } from '@vue/test-utils';
import HomeComponent from '@/components/HomeComponent.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue('value'),
}))

describe('HomeComponent', () => {
  let wrapper;
  const store = {
    state: {
      articles: []
    },
    dispatch: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(HomeComponent, {
      global: {
        mocks: {
          $store: store,
          axios
        }
      }
    });
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('getHeadlines', () => {
    const mockResponse = {
      data: {
        articles: [
          { title: 'Article 1' },
          { title: 'Article 2' },
          { title: 'Article 3' }
        ]
      }
    };

    beforeEach(() => {
      jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);
    });

    it('correctly makes API request', async () => {
      await wrapper.vm.getHeadlines();
      expect(wrapper.vm.loading).toBe(false);
      expect(wrapper.vm.articleArray).toEqual(mockResponse.data.articles);
      expect(store.dispatch).toHaveBeenCalledWith('setArticles', mockResponse.data.articles);
    });
  });
});