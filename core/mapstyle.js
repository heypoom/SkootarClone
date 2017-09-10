// This controls the Map's styles.
export const NaturalMap = [
  {
    'featureType': 'landscape',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'simplified'
      }, {
        'hue': '#0066ff'
      }, {
        'saturation': 30
      }, {
        'lightness': 30
      }, {
        'gamma': 1
      }
    ]
  }, {
    'featureType': 'road.highway',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off'
      }, {
        'weight': 0.6
      }, {
        'saturation': -85
      }, {
        'lightness': 61
      }
    ]
  }, {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'on'
      }
    ]
  }, {
    featureType: 'road.arterial',
    stylers: [
      {
        saturation: 0
      }, {
        lightness: 0
      }, {
        gamma: 1
      }
    ]
  }, {
    featureType: 'road.local',
    stylers: [
      {
        hue: '#00FFFD'
      }, {
        saturation: 0
      }, {
        lightness: 30
      }, {
        gamma: 1
      }
    ]
  }, {
    'featureType': 'water',
    'stylers': [
      {
        'visibility': 'simplified'
      }, {
        'color': '#00BFFF' // :
      }, {
        'lightness': 26
      }, {
        'gamma': 5.86
      }
    ]
  }, {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'simplified'
      }
    ]
  }]

export const MaterialMap = [
  {
    'featureType': 'administrative',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  }, {
    'featureType': 'landscape',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'simplified'
      }, {
        'hue': '#0066ff'
      }, {
        'saturation': 74
      }, {
        'lightness': 100
      }
    ]
  }, {
    'featureType': 'road',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'simplified'
      }
    ]
  }, {
    'featureType': 'road.arterial',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  }, {
    'featureType': 'road.local',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'on'
      }
    ]
  }, {
    'featureType': 'transit',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'simplified'
      }
    ]
  }]
