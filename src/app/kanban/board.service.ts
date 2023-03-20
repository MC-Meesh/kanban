import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from './board.model';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

//Create new board for current user 
async createBoard(data: Board){
  const user = await this.afAuth.currentUser;
  return this.db.collection('boards').add({
    ...data,
    uid: user?.uid,
    tasks: [{description: 'Hello!', label: 'red'}]
  })
}

//Delete board for current user
deleteBoard(boardId: string){
  return this.db.collection('boards').doc(boardId).delete();
}

//Update task array
updateTasks(boardId: string, tasks: Task){
  return this.db.collection('board').doc(boardId).update({tasks});
}

//Remove specific task from the board
removeTask(boardId: string, task: Task){
  return this.db.collection('board').doc(boardId).update({
    tasks: firebase.firestore.FieldValue.arrayRemove(task)  
  })
  //finds that specific task in the array and removes it
}

//Get all boards owned by a user
getUserBoards() {
  return this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.db
          .collection<Board>('boards', ref =>
            ref.where('uid', '==', user.uid).orderBy('priority')
          )
          .valueChanges({ idField: 'id' });
      } else {
        return [];
      }
    })
  );
}

//Batch to change the order or boards for sorting
sortBoards(boards: Board[]){
  const db = firebase.firestore();
  const batch = db.batch();
  const refs = boards.map(b => db.collection('boards').doc(b.id));
  refs.forEach((ref, idx) => batch.update(ref, {priority: idx}));
  batch.commit()
}

}
