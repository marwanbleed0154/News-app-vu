import { mount, createLocalVue } from '@vue/test-utils';
import HeadlineDetail from '@/components/HeadlineDetail.vue';

describe('HeadlineDetail', () => {
  let wrapper;
  const store = {
    state: {
      articles: [{
        title: 'Test Title',
        publishedAt: '2023-10-17T10:00:00.000Z',
        url: 'https://example.com',
        urlToImage: 'https://example.com/image.jpg',
        content: 'Test Content',
      }]
    },
    dispatch: jest.fn()
  };
  
  beforeEach(() => {
    const router  = {
      params: {id: 'MA==',type : 'articles'}
    } 
    wrapper = mount(HeadlineDetail, {
      data() {
        return {
          data: ''
        };
      },
      global: {
        mocks: {
          $route: router,
          $store: store,
        }
      }
    });
  });

  it('displays the title', () => {
    const titleElement = wrapper.find('.text-wrap a');
    console.log(titleElement)
    expect(titleElement.attributes('href')).toBe('https://example.com');
    expect(titleElement.text()).toBe('Test Title');
  });

  it('formats and displays the publication date', () => {
    const subtitleElement = wrapper.find('.publishedAt');
    expect(subtitleElement.text()).toBe('17-10-2023');
  });

  it('displays the image', () => {
    const imageElement = wrapper.find('.headline_img');
    expect(imageElement.attributes('src')).toBe('https://example.com/image.jpg');
  });

  it('displays the content', () => {
    const contentElement = wrapper.find('.hover_dispaly p');
    expect(contentElement.text()).toBe('Test Content');
  });
});
