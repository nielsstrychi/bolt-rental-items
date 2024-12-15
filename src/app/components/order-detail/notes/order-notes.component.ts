import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg p-6 border border-gray-200">
      <!-- Add Note Form -->
      <div class="mb-6">
        <div class="flex items-center gap-2 mb-4">
          <span class="material-icons text-gray-400">edit_note</span>
          <h3 class="text-sm font-medium">Add Note</h3>
        </div>
        <textarea 
          [(ngModel)]="newNote"
          rows="3"
          placeholder="Write a note..."
          class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 resize-none">
        </textarea>
        <div class="flex justify-end mt-3">
          <button 
            (click)="addNote()"
            [disabled]="!newNote.trim()"
            class="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Add Note
          </button>
        </div>
      </div>

      <!-- Notes List -->
      <div class="space-y-4">
        @for (note of notes; track note.id) {
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span class="material-icons text-gray-500 text-[16px]">person</span>
                </div>
                <div>
                  <div class="text-sm font-medium">{{note.author}}</div>
                  <div class="text-xs text-gray-500">{{formatDate(note.date)}}</div>
                </div>
              </div>
              <div class="relative">
                <button 
                  class="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  (click)="toggleOptions(note.id)">
                  <span class="material-icons text-gray-400 text-[18px]">more_horiz</span>
                </button>

                <!-- Options Menu -->
                @if (note.showOptions) {
                  <div class="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button 
                      class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                      (click)="editNote(note)">
                      <span class="material-icons text-gray-400 text-[18px]">edit</span>
                      Edit
                    </button>
                    <button 
                      class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                      (click)="deleteNote(note.id)">
                      <span class="material-icons text-[18px]">delete</span>
                      Delete
                    </button>
                  </div>
                }
              </div>
            </div>
            @if (note.isEditing) {
              <div class="mt-3">
                <textarea 
                  [(ngModel)]="note.editContent"
                  rows="2"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 resize-none">
                </textarea>
                <div class="flex justify-end gap-2 mt-2">
                  <button 
                    class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    (click)="cancelEdit(note)">
                    Cancel
                  </button>
                  <button 
                    class="px-3 py-1.5 text-sm text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                    (click)="saveEdit(note)">
                    Save
                  </button>
                </div>
              </div>
            } @else {
              <p class="text-sm text-gray-600 mt-3">{{note.content}}</p>
            }
          </div>
        }

        @if (notes.length === 0) {
          <div class="text-center py-8">
            <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <span class="material-icons text-gray-400">note_alt</span>
            </div>
            <p class="text-sm text-gray-500">No notes yet</p>
          </div>
        }
      </div>
    </div>
  `
})
export class OrderNotesComponent {
  newNote: string = '';
  notes: Array<{
    id: number;
    author: string;
    date: Date;
    content: string;
    showOptions: boolean;
    isEditing: boolean;
    editContent?: string;
  }> = [
    {
      id: 1,
      author: 'John Smith',
      date: new Date('2024-12-05T10:30:00'),
      content: 'Customer requested early pickup time. Approved for 8:30 AM.',
      showOptions: false,
      isEditing: false
    },
    {
      id: 2,
      author: 'Sarah Chen',
      date: new Date('2024-12-05T14:15:00'),
      content: 'Equipment checked and prepared for pickup. All items in excellent condition.',
      showOptions: false,
      isEditing: false
    }
  ];

  addNote(): void {
    if (this.newNote.trim()) {
      this.notes.unshift({
        id: this.notes.length + 1,
        author: 'Current User',
        date: new Date(),
        content: this.newNote.trim(),
        showOptions: false,
        isEditing: false
      });
      this.newNote = '';
    }
  }

  toggleOptions(noteId: number): void {
    // Close all other option menus
    this.notes.forEach(note => {
      if (note.id !== noteId) {
        note.showOptions = false;
      }
    });
    
    // Toggle the clicked note's options
    const note = this.notes.find(n => n.id === noteId);
    if (note) {
      note.showOptions = !note.showOptions;
    }
  }

  editNote(note: any): void {
    note.isEditing = true;
    note.editContent = note.content;
    note.showOptions = false;
  }

  saveEdit(note: any): void {
    if (note.editContent?.trim()) {
      note.content = note.editContent.trim();
      note.isEditing = false;
      note.date = new Date(); // Update timestamp
    }
  }

  cancelEdit(note: any): void {
    note.isEditing = false;
    note.editContent = note.content;
  }

  deleteNote(noteId: number): void {
    const index = this.notes.findIndex(note => note.id === noteId);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
