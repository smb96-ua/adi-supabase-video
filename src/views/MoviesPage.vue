<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Películas</ion-title>
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
          placeholder="Buscar películas..."
          @ionInput="handleSearch"
          :debounce="300"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <div v-show="!loading && movies.length === 0" class="empty-state">
        <ion-icon name="film-outline" size="large"></ion-icon>
        <p>No hay películas</p>
        <ion-button @click="openAddModal">Añadir película</ion-button>
      </div>
      
      <ion-list v-show="!loading && movies.length > 0">
        <ion-item v-for="(movie, index) in movies" :key="movie.id || `movie-${index}`">
          <ion-thumbnail slot="start" v-if="movie.poster">
            <img :src="movie.poster" :alt="movie.titulo || 'Película'" />
          </ion-thumbnail>
          <ion-avatar slot="start" v-else>
            <ion-icon name="film-outline" size="large"></ion-icon>
          </ion-avatar>
          <ion-label @click="openDetailModal(movie)" style="cursor: pointer;">
            <h2>{{ movie.titulo || 'Sin título' }}</h2>
            <p>{{ movie.genero || 'Sin género' }} · {{ movie.anio || 'Sin año' }}</p>
            <p class="director" v-if="movie.director">Dir: {{ movie.director }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" @click="openEditModal(movie)">
            <ion-icon slot="icon-only" name="create-outline" color="primary"></ion-icon>
          </ion-button>
          <ion-button fill="clear" slot="end" @click="confirmDelete(movie)">
            <ion-icon slot="icon-only" name="trash-outline" color="danger"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
      
      <ion-loading :is-open="loading" message="Cargando..."></ion-loading>
      
      <ion-modal :is-open="showModal" @didDismiss="closeModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ editingMovie ? 'Editar' : 'Nueva' }} Película</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal">Cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item>
              <ion-input label="Título *" label-placement="stacked" v-model="form.titulo" placeholder="Nombre de la película"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-textarea label="Descripción *" label-placement="stacked" v-model="form.descripcion" :rows="3" placeholder="Sinopsis"></ion-textarea>
            </ion-item>
            
            <ion-item>
              <ion-input label="Género *" label-placement="stacked" v-model="form.genero" placeholder="Ej: Acción, Drama..."></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-input label="Año *" label-placement="stacked" type="number" v-model="form.anio" placeholder="1900-2030"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-input label="Director" label-placement="stacked" v-model="form.director" placeholder="Nombre del director"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-input label="Duración (min)" label-placement="stacked" type="number" v-model="form.duracion" placeholder="Minutos"></ion-input>
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
          
          <ion-button expand="block" @click="saveMovie" class="ion-margin-top">
            {{ editingMovie ? 'Guardar Cambios' : 'Crear Película' }}
          </ion-button>
        </ion-content>
      </ion-modal>
      
      <ion-modal :is-open="showDetailModal" @didDismiss="closeDetailModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ selectedMovie?.titulo }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeDetailModal">Cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" v-if="selectedMovie">
          <div class="detail-content">
            <img v-if="selectedMovie.poster" :src="selectedMovie.poster" :alt="selectedMovie.titulo" class="detail-poster" />
            
            <h1>{{ selectedMovie.titulo }}</h1>
            
            <div class="detail-meta">
              <ion-chip v-if="selectedMovie.genero">
                <ion-label>{{ selectedMovie.genero }}</ion-label>
              </ion-chip>
              <ion-chip v-if="selectedMovie.anio">
                <ion-label>{{ selectedMovie.anio }}</ion-label>
              </ion-chip>
              <ion-chip v-if="selectedMovie.duracion">
                <ion-label>{{ selectedMovie.duracion }} min</ion-label>
              </ion-chip>
              <ion-chip v-if="selectedMovie.valoracion">
                <ion-label>⭐ {{ selectedMovie.valoracion }}</ion-label>
              </ion-chip>
            </div>
            
            <p v-if="selectedMovie.director" class="director-info">
              <strong>Director:</strong> {{ selectedMovie.director }}
            </p>
            
            <p v-if="selectedMovie.descripcion" class="description">
              {{ selectedMovie.descripcion }}
            </p>
            
            <ion-button 
              v-if="selectedMovie.trailer" 
              expand="block" 
              @click="openTrailer(selectedMovie.trailer)"
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
  IonLoading, IonThumbnail, IonAvatar, IonChip, alertController, toastController
} from '@ionic/vue'
import { logout } from '@/backend/services/authService'
import { getMovies, addMovie, updateMovie, deleteMovie, searchMovies, subscribeToMovies, Movie } from '@/backend/repositories/movieRepository'

const router = useRouter()
const movies = ref<Movie[]>([])
const loading = ref(true)
const searchQuery = ref('')
const showModal = ref(false)
const showDetailModal = ref(false)
const editingMovie = ref<Movie | null>(null)
const selectedMovie = ref<Movie | null>(null)

const form = ref({
  titulo: '',
  descripcion: '',
  genero: '',
  anio: null as number | null,
  director: '',
  duracion: null as number | null,
  valoracion: null as number | null,
  poster: '',
  trailer: ''
})

let unsubscribe: (() => void) | null = null

onMounted(async () => {
  await loadMovies()
  unsubscribe = subscribeToMovies(handleRealtimeUpdate)
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

async function loadMovies() {
  loading.value = true
  try {
    movies.value = await getMovies()
  } catch (err) {
    console.error('Error loading movies:', err)
    showToast('Error al cargar películas', 'danger')
  } finally {
    loading.value = false
  }
}

async function handleSearch() {
  try {
    movies.value = await searchMovies(searchQuery.value)
  } catch (err) {
    console.error('Error searching:', err)
  }
}

async function handleRefresh(event: CustomEvent) {
  await loadMovies()
  ;(event.target as HTMLIonRefresherElement).complete()
}

function handleRealtimeUpdate(data: any) {
  console.log('🔴 REALTIME - Cambio detectado en movies')
  console.log('Acción:', data.action)
  console.log('Record:', data.record)
  
  // Supabase usa eventos en MAYÚSCULAS: INSERT, UPDATE, DELETE
  const action = data.action?.toLowerCase()
  
  if (action === 'insert' || action === 'create') {
    const exists = movies.value.some(m => m.id === data.record.id)
    if (!exists) {
      movies.value = [data.record, ...movies.value]
    }
    showToast('Nueva película añadida', 'success')
  } else if (action === 'update') {
    const index = movies.value.findIndex(m => m.id === data.record.id)
    if (index !== -1) {
      movies.value = [...movies.value.slice(0, index), data.record, ...movies.value.slice(index + 1)]
    }
    showToast('Película actualizada', 'success')
  } else if (action === 'delete') {
    movies.value = movies.value.filter(m => m.id !== data.record.id)
    showToast('Película eliminada', 'warning')
  }
}

function openAddModal() {
  editingMovie.value = null
  resetForm()
  showModal.value = true
}

function openEditModal(movie: Movie) {
  editingMovie.value = movie
  form.value = {
    titulo: movie.titulo || '',
    descripcion: movie.descripcion || '',
    genero: movie.genero || '',
    anio: movie.anio || null,
    director: movie.director || '',
    duracion: movie.duracion || null,
    valoracion: movie.valoracion || null,
    poster: movie.poster || '',
    trailer: movie.trailer || ''
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingMovie.value = null
  resetForm()
}

function openDetailModal(movie: Movie) {
  selectedMovie.value = movie
  showDetailModal.value = true
}

function closeDetailModal() {
  showDetailModal.value = false
  selectedMovie.value = null
}

function resetForm() {
  form.value = {
    titulo: '',
    descripcion: '',
    genero: '',
    anio: null,
    director: '',
    duracion: null,
    valoracion: null,
    poster: '',
    trailer: ''
  }
}

async function saveMovie() {
  if (!form.value.titulo || !form.value.descripcion || !form.value.genero || !form.value.anio) {
    showToast('Título, descripción, género y año son obligatorios', 'warning')
    return
  }
  
  const movieData = {
    titulo: form.value.titulo,
    descripcion: form.value.descripcion,
    genero: form.value.genero,
    anio: Number(form.value.anio),
    director: form.value.director || undefined,
    duracion: form.value.duracion ? Number(form.value.duracion) : undefined,
    valoracion: form.value.valoracion ? Number(form.value.valoracion) : undefined,
    poster: form.value.poster || undefined,
    trailer: form.value.trailer || undefined
  }
  
  try {
    if (editingMovie.value) {
      await updateMovie(editingMovie.value.id!, movieData)
      showToast('Película actualizada', 'success')
    } else {
      await addMovie(movieData)
      showToast('Película creada', 'success')
    }
    closeModal()
    await loadMovies()
  } catch (err: any) {
    console.error('Error saving movie:', err)
    showToast(err?.message || 'Error al guardar', 'danger')
  }
}

async function confirmDelete(movie: Movie) {
  const alert = await alertController.create({
    header: 'Confirmar eliminación',
    message: `¿Eliminar "${movie.titulo}"?`,
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      { 
        text: 'Eliminar', 
        role: 'destructive',
        handler: async () => {
          await handleDelete(movie)
        }
      }
    ]
  })
  await alert.present()
}

async function handleDelete(movie: Movie) {
  try {
    await deleteMovie(movie.id!)
    showToast('Película eliminada', 'success')
    await loadMovies()
  } catch (err) {
    console.error('Error deleting movie:', err)
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

.director {
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

.director-info {
  color: var(--ion-color-medium);
  margin-bottom: 16px;
}

.description {
  text-align: left;
  margin-bottom: 24px;
  line-height: 1.6;
}
</style>
