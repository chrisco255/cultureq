const ContentTypes = {
  RICHTEXT: 'RICHTEXT',
  VIDEO: 'VIDEO',
  QUOTE: 'QUOTE',
  properties: {
    RICHTEXT: {
      value: 'richtext',
      name: 'Article',
      description: 'A text editor where you can write in any format you want.'
    },
    VIDEO: {
      value: 'video',
      name: 'Video',
      description: 'Displays a video with a title and description.'
    },
    QUOTE: {
      value: 'quote',
      name: 'Quote',
      description: 'Displays a quote with the accredited author.'
    }
  }
};

module.exports = ContentTypes;
