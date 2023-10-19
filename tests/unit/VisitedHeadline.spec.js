import { mount } from '@vue/test-utils';
import VisitedHeadline from '@/components/VisitedHeadline.vue';

describe('VisitedHeadline.vue', () => {
  let wrapper;
  const store = {
    state: {
      visitedHeadlines: [
        {
          source: {
            id: 'reuters',
            name: 'Reuters',
          },
          author: 'Robert Harvey',
          title: 'Oil prices steady above $90 as investors assess Israel-Hamas war - Reuters',
          description:
            'Brent oil futures steadied above $90 a barrel on Monday after passing the threshold on Friday, as investors waited to see if the Israel-Hamas conflict draws in other countries.',
          url: 'https://www.reuters.com/markets/commodities/oil-prices-ease-investors-assess-impact-israel-hamas-war-2023-10-15/',
          urlToImage:
            'https://www.reuters.com/resizer/SIP679oL512h2rbEeff_CG9G8SY=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/B6ZNIOAF5ZP7BG4JTJVX2A237Q.jpg',
          publishedAt: '2023-10-16T10:12:48Z',
          content:
            'LONDON, Oct 16 (Reuters) - Brent oil futures steadied above $90 a barrel on Monday after passing the threshold on Friday, as investors waited to see if the Israel-Hamas conflict draws in other countr… [+2304 chars]',
        },
      ],
    },
    dispatch: jest.fn(),
  };
  beforeEach(() => {
    wrapper = mount(VisitedHeadline, {
      global: {
        mocks: {
          $store: store,
        },
      },
    });
    jest.clearAllMocks();
  });
  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes data correctly', () => {

    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.selection).toBe(1);
    expect(wrapper.vm.dialog).toBe(false);
    expect(wrapper.vm.headline).toBe('');
    expect(wrapper.vm.selectedIndex).toBe(0);
  });
  it('updates headline correctly', () => {
    wrapper.setData({
      selectedIndex: 0,
      headline: 'New Headline',
    });

    wrapper.vm.updateHeadline();
    expect(wrapper.vm.$store.state.visitedHeadlines[0].title).toBe('New Headline');
    expect(wrapper.vm.dialog).toBe(false);
  });
});
