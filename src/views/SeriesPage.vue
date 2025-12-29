<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Series</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openAddModal">
            <ion-icon slot="icon-only" name="add"></ion-icon>
          </ion-button>
          <ion-button @click="handleLogout">
            <ion-icon slot="icon-only" name="log-out-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          v-model="searchQuery"
          placeholder="Buscar series..."
          @ionInput="handleSearch"
          :debounce="300"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <div v-show="!loading && series.length === 0" class="empty-state">
        <ion-icon name="tv-outline" size="large"></ion-icon>
        <p>No hay series</p>
        <ion-button @click="openAddModal">Añadir serie</ion-button>
      </div>
      
      <ion-list v-show="!loading && series.length > 0">
        <ion-item v-for="(serie, index) in series" :key="serie.id || `serie-${index}`">
          <ion-thumbnail slot="start" v-if="serie.poster">
            <img :src="serie.poster" :alt="serie.titulo || 'Serie'" />
          </ion-thumbnail>
          <ion-avatar slot="start" v-else>
            <ion-icon name="tv-outline" size="large"></ion-icon>
          </ion-avatar>
          <ion-label @click="openDetailModal(serie)" style="cursor: pointer;">
            <h2>{{ serie.titulo || 'Sin título' }}</h2>
            <p>{{ serie.genero || 'Sin género' }} · {{ serie.anio || 'Sin año' }}</p>
            <p class="creador" v-if="serie.creador">Creador: {{ serie.creador }}</p>
            <p class="estado" v-if="serie.estado">{{ serie.estado }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" @click="openEditModal(serie)">
            <ion-icon slot="icon-only" name="create-outline" color="primary"></ion-icon>
          </ion-button>
          <ion-button fill="clear" slot="end" @click="confirmDelete(serie)">
            <ion-icon slot="icon-only" name="trash-outline" color="danger"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
      
      <ion-loading :is-open="loading" message="Cargando..."></ion-loading>
      
      <ion-modal :is-open="showModal" @didDismiss="closeModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ editingSerie ? 'Editar' : 'Nueva' }} Serie</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal">Cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item>
              <ion-input label="Título *" label-placement="stacked" v-model="form.titulo" placeholder="Nombre de la serie"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-textarea label="Descripción *" label-placement="stacked" v-model="form.descripcion" :rows="3" placeholder="Sinopsis"></ion-textarea>
            </ion-item>
            
            <ion-item>
              <ion-input label="Género *" label-placement="stacked" v-model="form.genero" placeholder="Ej: Drama, Comedia..."></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-input label="Año *" label-placement="stacked" type="number" v-model="form.anio" placeholder="1900-2030"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-input label="Creador" label-placement="stacked" v-model="form.creador" placeholder="Nombre del creador"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-select label="Estado" label-placement="stacked" v-model="form.estado" placeholder="Seleccionar estado">
                <ion-select-option value="">Sin especificar</ion-select-option>
                <ion-select-option value="En emisión">En emisión</ion-select-option>
                <ion-select-option value="Finalizada">Finalizada</ion-select-option>
                <ion-select-option value="Cancelada">Cancelada</ion-select-option>
                <ion-select-option value="Próximamente">Próximamente</ion-select-option>
              </ion-select>
            </ion-item>
            
            <ion-item>
              <ion-input label="Valoración (0-10)" label-placement="stacked" type="number" v-model="form.valoracion" placeholder="0-10"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-input label="Poster URL" label-placement="stacked" type="url" v-model="form.poster" placeholder="https://..."></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-input label="Trailer URL" label-placement="stacked" type="url" v-model="form.trailer" placeholder="https://..."></ion-input>
            </ion-item>
          </ion-list>
          
          <ion-button expand="block" @click="saveSerie" class="ion-margin-top">
            {{ editingSerie ? 'Guardar Cambios' : 'Crear Serie' }}
          </ion-button>
        </ion-content>
      </ion-modal>
      
      <ion-modal :is-open="showDetailModal" @didDismiss="closeDetailModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ selectedSerie?.titulo }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeDetailModal">Cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" v-if="selectedSerie">
          <div class="detail-content">
            <img v-if="selectedSerie.poster" :src="selectedSerie.poster" :alt="selectedSerie.titulo" class="detail-poster" />
            
            <h1>{{ selectedSerie.titulo }}</h1>
            
            <div class="detail-meta">
              <ion-chip v-if="selectedSerie.genero">
                <ion-label>{{ selectedSerie.genero }}</ion-label>
              </ion-chip>
              <ion-chip v-if="selectedSerie.anio">
                <ion-label>{{ selectedSerie.anio }}</ion-label>
              </ion-chip>
              <ion-chip v-if="selectedSerie.estado">
                <ion-label>{{ selectedSerie.estado }}</ion-label>
              </ion-chip>
              <ion-chip v-if="selectedSerie.valoracion">
                <ion-label>⭐ {{ selectedSerie.valoracion }}</ion-label>
              </ion-chip>
            </div>
            
            <p v-if="selectedSerie.creador" class="creador-info">
              <strong>Creador:</strong> {{ selectedSerie.creador }}
            </p>
            
            <p v-if="selectedSerie.descripcion" class="description">
              {{ selectedSerie.descripcion }}
            </p>
            
            <ion-button 
              v-if="selectedSerie.trailer" 
              expand="block" 
              @click="openTrailer(selectedSerie.trailer)"
            >
              <ion-icon slot="start" name="play-outline"></ion-icon>
              Ver Trailer
            </ion-button>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonButton, IonButtons, IonIcon, IonSearchbar,
  IonRefresher, IonRefresherContent, IonModal, IonInput, IonTextarea, 
  IonLoading, IonThumbnail, IonAvatar, IonChip, IonSelect, IonSelectOption,
  alertController, toastController
} from '@ionic/vue'
import { logout } from '@/backend/services/authService'
import { getSeries, addSerie, updateSerie, deleteSerie, searchSeries, subscribeToSeries, Serie } from '@/backend/repositories/seriesRepository'

const router = useRouter()
const series = ref<Serie[]>([])
const loading = ref(true)
const searchQuery = ref('')
const showModal = ref(false)
const showDetailModal = ref(false)
const editingSerie = ref<Serie | null>(null)
const selectedSerie = ref<Serie | null>(null)

const form = ref({
  titulo: '',
  descripcion: '',
  genero: '',
  anio: null as number | null,
  creador: '',
  estado: '',
  valoracion: null as number | null,
  poster: '',
  trailer: ''
})

let unsubscribe: (() => void) | null = null

onMounted(async () => {
  await loadSeries()
  unsubscribe = subscribeToSeries(handleRealtimeUpdate)
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

async function loadSeries() {
  loading.value = true
  try {
    series.value = await getSeries()
  } catch (err) {
    console.error('Error loading series:', err)
    showToast('Error al cargar series', 'danger')
  } finally {
    loading.value = false
  }
}

async function handleSearch() {
  try {
    series.value = await searchSeries(searchQuery.value)
  } catch (err) {
    console.error('Error searching:', err)
  }
}

async function handleRefresh(event: CustomEvent) {
  await loadSeries()
  ;(event.target as HTMLIonRefresherElement).complete()
}

function handleRealtimeUpdate(data: any) {
  console.log('🔴 REALTIME - Cambio detectado en series')
  console.log('Acción:', data.action)
  console.log('Record:', data.record)
  
  // Supabase usa eventos en MAYÚSCULAS: INSERT, UPDATE, DELETE
  const action = data.action?.toLowerCase()
  
  if (action === 'insert' || action === 'create') {
    const exists = series.value.some(s => s.id === data.record.id)
    if (!exists) {
      series.value = [data.record, ...series.value]
    }
    showToast('Nueva serie añadida', 'success')
  } else if (action === 'update') {
    const index = series.value.findIndex(s => s.id === data.record.id)
    if (index !== -1) {
      series.value = [...series.value.slice(0, index), data.record, ...series.value.slice(index + 1)]
    }
    showToast('Serie actualizada', 'success')
  } else if (action === 'delete') {
    series.value = series.value.filter(s => s.id !== data.record.id)
    showToast('Serie eliminada', 'warning')
  }
}

function openAddModal() {
  editingSerie.value = null
  resetForm()
  showModal.value = true
}

function openEditModal(serie: Serie) {
  editingSerie.value = serie
  form.value = {
    titulo: serie.titulo || '',
    descripcion: serie.descripcion || '',
    genero: serie.genero || '',
    anio: serie.anio || null,
    creador: serie.creador || '',
    estado: serie.estado || '',
    valoracion: serie.valoracion || null,
    poster: serie.poster || '',
    trailer: serie.trailer || ''
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingSerie.value = null
  resetForm()
}

function openDetailModal(serie: Serie) {
  selectedSerie.value = serie
  showDetailModal.value = true
}

function closeDetailModal() {
  showDetailModal.value = false
  selectedSerie.value = null
}

function resetForm() {
  form.value = {
    titulo: '',
    descripcion: '',
    genero: '',
    anio: null,
    creador: '',
    estado: '',
    valoracion: null,
    poster: '',
    trailer: ''
  }
}

async function saveSerie() {
  if (!form.value.titulo || !form.value.descripcion || !form.value.genero || !form.value.anio) {
    showToast('Título, descripción, género y año son obligatorios', 'warning')
    return
  }
  
  const serieData = {
    titulo: form.value.titulo,
    descripcion: form.value.descripcion,
    genero: form.value.genero,
    anio: Number(form.value.anio),
    creador: form.value.creador || undefined,
    estado: form.value.estado || undefined,
    valoracion: form.value.valoracion ? Number(form.value.valoracion) : undefined,
    poster: form.value.poster || undefined,
    trailer: form.value.trailer || undefined
  }
  
  try {
    if (editingSerie.value) {
      await updateSerie(editingSerie.value.id!, serieData)
      showToast('Serie actualizada', 'success')
    } else {
      await addSerie(serieData)
      showToast('Serie creada', 'success')
    }
    closeModal()
    await loadSeries()
  } catch (err: any) {
    console.error('Error saving serie:', err)
    showToast(err?.message || 'Error al guardar', 'danger')
  }
}

async function confirmDelete(serie: Serie) {
  const alert = await alertController.create({
    header: 'Confirmar eliminación',
    message: `¿Eliminar "${serie.titulo}"?`,
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      { 
        text: 'Eliminar', 
        role: 'destructive',
        handler: async () => {
          await handleDelete(serie)
        }
      }
    ]
  })
  await alert.present()
}

async function handleDelete(serie: Serie) {
  try {
    await deleteSerie(serie.id!)
    showToast('Serie eliminada', 'success')
    await loadSeries()
  } catch (err) {
    console.error('Error deleting serie:', err)
    showToast('Error al eliminar', 'danger')
  }
}

function openTrailer(url: string) {
  window.open(url, '_blank')
}

async function showToast(message: string, color: string) {
  const toast = await toastController.create({
    message,
    duration: 2000,
    color,
    position: 'bottom'
  })
  await toast.present()
}

async function handleLogout() {
  await logout()
  router.push('/login')
}
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;
  color: var(--ion-color-medium);
}

.empty-state ion-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.creador, .estado {
  font-size: 12px;
  color: var(--ion-color-medium);
}

ion-thumbnail {
  --size: 60px;
  --border-radius: 8px;
}

ion-thumbnail img {
  object-fit: cover;
}

ion-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ion-color-light);
}

.detail-content {
  text-align: center;
}

.detail-poster {
  max-width: 100%;
  max-height: 300px;
  border-radius: 12px;
  margin-bottom: 16px;
  object-fit: cover;
}

.detail-meta {
  margin: 16px 0;
}

.creador-info {
  color: var(--ion-color-medium);
  margin-bottom: 16px;
}

.description {
  text-align: left;
  margin-bottom: 24px;
  line-height: 1.6;
}
</style>
