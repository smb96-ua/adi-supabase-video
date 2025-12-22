<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="movies" href="/tabs/movies">
          <ion-icon name="film-outline"></ion-icon>
          <ion-label>Películas</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="series" href="/tabs/series">
          <ion-icon name="tv-outline"></ion-icon>
          <ion-label>Series</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel,
  IonRouterOutlet
} from '@ionic/vue'
</script>
