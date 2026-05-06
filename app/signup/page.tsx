await createUserWithEmailAndPassword(auth, email, password);

const user = auth.currentUser;

if (user) {
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    role: "user",
  });
}