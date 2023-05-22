# Mapbox maps

This project is about showing the accident black spots in the maps using mapbox. We integrated hardware and software.
We used accelerometer sensor, gps, ESP to get the location of the accident spot when the sensor is activated by impacting a high force.

Then the location is stored in a realtime database and then it is shown in map.

## API Reference

#### Geocoding

```fetch
  GET https://api.mapbox.com/geocoding/v5/mapbox.places/
  ${params.location}.json?access_token=${mapboxAPI}
```

| Parameter         | Type     | Description                        |
| :---------------- | :------- | :--------------------------------- |
| `params.location` | `string` | **Required**. Name of the location |
| `mapboxAPI`       | `string` | **Required**. API key of mapbox    |

#### Reverse Geocoding

```fetch
  GET https://api.mapbox.com/geocoding/v5/mapbox.places/
  ${long},${lat}.json?access_token=${apiKey}
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `long`    | `string` | **Required**. longitude         |
| `lat`     | `string` | **Required**. latitude          |
| `apiKey`  | `string` | **Required**. API key of mapbox |

## Tech Stack

**Client:** Next.js

**Database:** Firebase

**Hosting:** Netlify
