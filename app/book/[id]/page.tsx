const handleBooking = async () => {
  const user = auth.currentUser;

  const docRef = await addDoc(collection(db, "bookings"), {
    tutorId: tutor.id,
    tutorName: tutor.name,
    userId: user?.uid,
    userEmail: user?.email,
    date,
    time,
    status: "pending",
  });

  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tutor,
      bookingId: docRef.id,
    }),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  }
};