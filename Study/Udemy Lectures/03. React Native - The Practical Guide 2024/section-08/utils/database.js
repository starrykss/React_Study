import * as SQLite from 'expo-sqlite';

import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

// DB 초기화
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
        )`,
        [],
        // Success
        () => {
          resolve();
        },
        // Error
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

// 장소 아이템 추가
export async function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        }, // success
        (_, error) => {
          reject(error);
        } // error
      );
    });
  });
}

// 장소 아이템 불러오기
export async function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

// 장소 상세 데이터 가져오기
export async function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.executeSql(
      `SELECT * FROM places WHERE id = ?`,
      [id],
      (_, result) => {
        const dbPlace = result.rows._array[0];
        const place = new Place(
          dbPlace.title,
          dbPlace.imageUri,
          {
            lat: dbPlace.lat,
            lng: dbPlace.lng,
            address: dbPlace.address,
          },
          dbPlace.id
        );

        resolve(place);
      },
      (_, error) => {
        reject(error);
      }
    );
  });
}
