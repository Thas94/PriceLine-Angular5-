var today = new Date().toISOString().split('T')[0];
document.getElementsByName("startDate")[0].setAttribute('min', today);