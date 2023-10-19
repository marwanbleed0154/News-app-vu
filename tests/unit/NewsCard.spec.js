import { shallowMount } from '@vue/test-utils';
import NewsCard from '@/components/NewsCard.vue';

const mockRouter = {
  push: jest.fn(),
};

describe('NewsCard.vue', () => {
  it('renders a list of news cards with the correct data', () => {
    const newsArray = [
      {
        title: 'Sample Title 1',
        publishedAt: '2023-10-17T10:00:00.000Z',
        content: 'Sample content for news 1',
      },
    ];

    const wrapper = shallowMount(NewsCard, {
      propsData: {
        newsArray,
        type: 'articles', 
      },
      mocks: {
        $router: mockRouter,
      },
    });

    expect(wrapper.findAll('.headline_list')).toHaveLength(newsArray.length);
    expect(wrapper.text()).toContain(newsArray[0].title);
    expect(wrapper.text()).toContain('10-17-2023');
  });

});
