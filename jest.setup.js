global.mapboxgl = {
    Map: jest.fn(() => ({
      on: jest.fn(),
      addSource: jest.fn(),
      addLayer: jest.fn(),
      flyTo: jest.fn(),
      getSource: jest.fn().mockReturnValue({
        setData: jest.fn()
      }),
    })),
    accessToken: ''
  };
  