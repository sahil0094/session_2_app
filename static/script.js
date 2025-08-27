const animalCheckboxes = document.querySelectorAll('input[name="animal"]');
const animalImage = document.getElementById('animal-image');
const uploadButton = document.getElementById('upload-button');
const fileInput = document.getElementById('file-input');
const uploadResult = document.getElementById('upload-result');

// Ensure only one checkbox is selected and show corresponding image
animalCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    if (cb.checked) {
      animalCheckboxes.forEach(other => { if (other !== cb) other.checked = false; });
      const value = cb.value;
      const imagePath = `/static/images/${value}.svg`;
      animalImage.src = imagePath;
      animalImage.style.display = 'block';
    } else {
      const anyChecked = Array.from(animalCheckboxes).some(x => x.checked);
      if (!anyChecked) {
        animalImage.style.display = 'none';
        animalImage.removeAttribute('src');
      }
    }
  });
});

// Upload handler
uploadButton.addEventListener('click', async () => {
  const file = fileInput.files && fileInput.files[0];
  if (!file) {
    uploadResult.textContent = 'Please select a file first.';
    return;
  }
  const form = new FormData();
  form.append('file', file);
  try {
    const res = await fetch('/upload', { method: 'POST', body: form });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    uploadResult.textContent = `Name: ${data.name}\nSize: ${data.size} bytes\nType: ${data.type}`;
  } catch (e) {
    uploadResult.textContent = `Error: ${e.message}`;
  }
});


