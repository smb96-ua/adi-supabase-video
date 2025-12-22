<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>ADIFlix</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="login-container">
        <div class="login-header">
          <ion-icon name="film-outline" class="logo-icon"></ion-icon>
          <h1>ADIFlix</h1>
          <p>{{ isRegister ? 'Crea una cuenta' : 'Inicia sesión' }}</p>
        </div>
        
        <ion-list>
          <ion-item v-if="isRegister">
            <ion-input 
              label="Nombre" 
              label-placement="stacked"
              v-model="name"
              placeholder="Tu nombre"
              autocomplete="name"
            ></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-input 
              label="Email *" 
              label-placement="stacked"
              type="email" 
              v-model="email" 
              placeholder="correo@ejemplo.com"
              autocomplete="email"
            ></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-input 
              label="Contraseña *" 
              label-placement="stacked"
              type="password" 
              v-model="password" 
              placeholder="Mínimo 8 caracteres"
              autocomplete="current-password"
            ></ion-input>
          </ion-item>
          
          <ion-item v-if="isRegister">
            <ion-input 
              label="Confirmar Contraseña *" 
              label-placement="stacked"
              type="password" 
              v-model="passwordConfirm"
              placeholder="Repite la contraseña"
              autocomplete="new-password"
            ></ion-input>
          </ion-item>
        </ion-list>
        
        <ion-button 
          expand="block" 
          @click="handleSubmit" 
          class="login-button"
          :disabled="loading"
        >
          <ion-spinner v-if="loading" name="crescent"></ion-spinner>
          <span v-else>{{ isRegister ? 'Registrarse' : 'Iniciar Sesión' }}</span>
        </ion-button>
        
        <ion-button 
          expand="block" 
          fill="clear" 
          @click="toggleMode"
          class="toggle-button"
        >
          {{ isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate' }}
        </ion-button>
        
        <ion-text color="danger" v-if="error" class="error-message">
          <p>{{ error }}</p>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonList,
  IonInput, 
  IonButton,
  IonText,
  IonSpinner,
  IonIcon,
  toastController
} from '@ionic/vue'
import { login, register } from '@/backend/services/authService'

const router = useRouter()
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const name = ref('')
const loading = ref(false)
const error = ref('')
const isRegister = ref(false)

function toggleMode() {
  isRegister.value = !isRegister.value
  error.value = ''
}

async function handleSubmit() {
  if (!email.value || !password.value) {
    error.value = 'Por favor, completa email y contraseña'
    return
  }
  
  if (isRegister.value) {
    if (password.value.length < 8) {
      error.value = 'La contraseña debe tener al menos 8 caracteres'
      return
    }
    if (password.value !== passwordConfirm.value) {
      error.value = 'Las contraseñas no coinciden'
      return
    }
  }
  
  loading.value = true
  error.value = ''
  
  try {
    if (isRegister.value) {
      await register(email.value, password.value, passwordConfirm.value, name.value)
      const toast = await toastController.create({
        message: 'Cuenta creada correctamente',
        duration: 2000,
        color: 'success'
      })
      await toast.present()
    }
    await login(email.value, password.value)
    router.push('/tabs/movies')
  } catch (err: any) {
    console.error('Auth error:', err)
    error.value = isRegister.value ? 'Error al crear la cuenta. El email puede estar en uso.' : 'Credenciales incorrectas'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 64px;
  color: var(--ion-color-primary);
}

.login-header h1 {
  margin: 16px 0 8px;
  font-size: 28px;
  font-weight: bold;
  color: var(--ion-color-primary);
}

.login-header p {
  color: var(--ion-color-medium);
  margin: 0;
}

ion-list {
  background: transparent;
  margin-bottom: 16px;
}

ion-item {
  --background: transparent;
  margin-bottom: 8px;
}

.login-button {
  margin-top: 16px;
}

.toggle-button {
  margin-top: 8px;
}

.error-message {
  display: block;
  text-align: center;
  margin-top: 16px;
}
</style>
