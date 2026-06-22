export async function shareWebsite() {
  try {
    await navigator.share({
      title: "ونسنّا",
      text: "ألعاب جماعية من جهاز واحد",
      url: window.location.origin,
    });
  } catch (error) {
    console.log("تم إلغاء المشاركة", error);
  }
}