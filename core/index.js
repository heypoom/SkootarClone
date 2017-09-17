// Ideally, this API Key should be contained in an environment file and restricted.
export const GMAPS_API_KEY = 'AIzaSyByuPdK_PChenE1ejwbdyCDb861nWpdtF8'

// The shipping cost per kilometers
export const PRICING_RATE = 30

// Additional costs for extra services
export const SERVICES = {
  cod: {
    name: 'COD',
    cost: 50,
    icon: 'cube'
  },
  returnTrip: {
    name: 'Return Trip',
    cost: 100,
    icon: 'refresh'
  },
  bigParcel: {
    name: 'Big Parcel',
    cost: 200,
    icon: 'money'
  }
}
