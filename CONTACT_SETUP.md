# 📧 Configuración del Formulario de Contacto

## 🚀 Opción 1: Formspree (Recomendada - GRATIS)

### Pasos para configurar:

1. **Ir a Formspree:**
   - Visita: https://formspree.io/
   - Regístrate con tu email `gaggero25@gmail.com`

2. **Crear un nuevo formulario:**
   - Haz clic en "New Form"
   - Ingresa tu email: `gaggero25@gmail.com`
   - Copia el Form ID que te dan (ejemplo: `xvgpkjkl`)

3. **Actualizar el código:**
   - En `src/components/Contact.astro`
   - Reemplaza `YOUR_FORM_ID` por tu Form ID real:
   ```html
   action="https://formspree.io/f/xvgpkjkl"
   ```

4. **¡Listo!** - El formulario ya funciona y envía emails a tu Gmail.

### ✅ Características incluidas:
- ✉️ Emails automáticos a `gaggero25@gmail.com`
- 📱 Notificaciones visuales de éxito/error
- 🔄 Manejo de errores automático
- 🎨 Interfaz elegante y profesional
- 📊 Dashboard para ver mensajes recibidos
- 🛡️ Protección anti-spam incluida

---

## 🚀 Opción 2: EmailJS (Alternativa)

### Pasos para configurar:

1. **Ir a EmailJS:**
   - Visita: https://www.emailjs.com/
   - Regístrate gratis

2. **Configurar servicio de email:**
   - Conecta tu Gmail `gaggero25@gmail.com`
   - Crea un template de email
   - Obtén tu Service ID, Template ID y Public Key

3. **Actualizar el código:**
   - Instalar EmailJS: `npm install emailjs-com`
   - Modificar el script en Contact.astro

---

## 🚀 Opción 3: Netlify Forms (Si usas Netlify)

Si deployeas en Netlify, solo necesitas:
1. Agregar `data-netlify="true"` al form
2. ¡Ya funciona automáticamente!

---

## 📋 Datos que recibirás por email:

- **Nombre completo**
- **Email del contacto**
- **Empresa** (opcional)
- **Teléfono** (opcional)
- **Tipo de proyecto**
- **Presupuesto estimado**
- **Timeline deseado**
- **Mensaje detallado**

---

## 🎯 Recomendación:

**Usa Formspree** - Es la opción más fácil y rápida. Solo necesitas:
1. Crear cuenta en formspree.io
2. Reemplazar `YOUR_FORM_ID` en el código
3. ¡Listo!

El formulario ya está preparado para funcionar perfectamente. 🎉
