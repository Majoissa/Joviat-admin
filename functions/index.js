const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {logger} = require("firebase-functions");

admin.initializeApp();

 //Función para eliminar alumno y autenticación
exports.deleteStudentAndAuth = functions.firestore
    .document("users/{userId}")
    .onDelete(async (snap, context) => {
    const deletedStudent = snap.data();
      const deletedUserId = context.params.userId;

    try {
        // Eliminar el usuario de la autenticación de Firebase
        await admin.auth().deleteUser(deletedUserId);

        // Log de información sobre la eliminación del alumno y su autenticación
        logger.info("Student " + deletedStudent.nom +
        " " +
        deletedStudent.cognom+
        " with ID "+
        deletedUserId+
        " and associated authentication deleted");
      } catch (error) {
        // Manejar cualquier error que pueda ocurrir al
        // eliminar la autenticación del usuario
        logger.error("Error deleting auth for student" +
        deletedUserId + ":", error);
      }
    });
