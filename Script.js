class PreWinterNotes {
   constructor() {
        this.notes = [];
        this.preWinterEmojis = ['🌫️', '🌁', '🌀', '💨', '🌬️'];
        this.init();
   }

   init(){
        this.loadNotesFromStorage();
        this.displayNotes();
        this.bindEvents();
        this.createFallingMist();
        this.showWelcomeMessage();
   }

   bindEvents() {
        const saveBtn = document.getElementById('saveBtn');
        const clearBtn = document.getElementById('clearBtn');
        const noteInput = document.getElementById('noteInput');

        // Only bind if elements exist
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveNote());
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearInput());
        }

        if (noteInput) {
            noteInput.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    this.saveNote();
                }
            });

            noteInput.addEventListener('input', () => {
                this.saveDraft();
            });

            // Clear draft when input is cleared
            noteInput.addEventListener('input', (e) => {
                if (!e.target.value.trim()) {
                    this.removeDraft();
                }
            });
        }

        // Event delegation for delete buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const noteId = e.target.getAttribute('data-note-id');
                if (noteId) {
                    console.log('Deleting note with ID:', noteId); // Debug log
                    this.deleteNote(noteId);
                }
            }
        });
    }


    // Save Note
    saveNote() {
        const noteInput = document.getElementById('noteInput');
        const content = noteInput.value.trim();

        if (!content) {
            this.showToast('Please write something before saving! 🌫️', 'warning');
            return;
        }

        const note = {
            id: this.generateId(),
            content: content,
            timestamp: new Date(),
            emoji: this.preWinterEmojis[Math.floor(Math.random() * this.preWinterEmojis.length)]
        };

        this.notes.unshift(note);
        this.saveNotesToStorage();
        this.displayNotes();
        this.clearInput();
        this.removeDraft();
        
        this.showToast('Note saved successfully! 🌬️', 'success');
    }

    // Clear Input
    clearInput() {
        const noteInput = document.getElementById('noteInput');
        noteInput.value = '';
        noteInput.focus();
    }

    // Delete Note
    deleteNote(id) {
        console.log('deleteNote called with ID:', id); // Debug log
        console.log('Current notes before delete:', this.notes.length); // Debug log
        
        this.notes = this.notes.filter(note => note.id !== id);
        
        console.log('Notes after delete:', this.notes.length); // Debug log
        
        this.saveNotesToStorage();
        this.displayNotes();
        this.showToast('Note deleted! 💨', 'info');
    }

    // Display Notes
    displayNotes() {
        const notesList = document.getElementById('notesList');
        
        if (this.notes.length === 0) {
            notesList.innerHTML = `
                <div class="empty-state">
                    <p>🌫️ No notes yet...</p>
                    <p>Start capturing your pre-winter thoughts!</p>
                </div>
            `;
            return;
        }

        notesList.innerHTML = this.notes.map(note => `
            <div class="note-card" data-id="${note.id}">
                <div class="note-header">
                    <span class="note-emoji">${note.emoji}</span>
                    <span class="note-date">${this.formatDate(note.timestamp)}</span>
                    <button class="delete-btn" data-note-id="${note.id}">
                        ×
                    </button>
                </div>
                <div class="note-content">
                    ${this.formatNoteContent(note.content)}
                </div>
            </div>
        `).join('');
    }

    // Format Note Content
    formatNoteContent(content) {
        return content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }

    // Storage Methods
    saveNotesToStorage() {
        localStorage.setItem('preWinterNotes', JSON.stringify(this.notes));
    }

    loadNotesFromStorage() {
        const stored = localStorage.getItem('preWinterNotes');
        if (stored) {
            this.notes = JSON.parse(stored).map(note => ({
                ...note,
                timestamp: new Date(note.timestamp)
            }));
        }
    }

    // Draft Management
    saveDraft() {
        const noteInput = document.getElementById('noteInput');
        const content = noteInput.value.trim();
        if (content) {
            localStorage.setItem('preWinterNotesDraft', content);
        }
    }

    loadDraft() {
        const draft = localStorage.getItem('preWinterNotesDraft');
        if (draft) {
            document.getElementById('noteInput').value = draft;
        }
    }

    removeDraft() {
        localStorage.removeItem('preWinterNotesDraft');
    }

    // Utility Methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatDate(date) {
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);
        
        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)} hours ago`;
        } else {
            return date.toLocaleDateString();
        }
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Export Notes
    exportNotes() {
        if (this.notes.length === 0) {
            this.showToast('No notes to export! 🌁', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.notes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `pre-winter-notes-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showToast('Notes exported successfully! 🌬️', 'success');
    }

    // Statistics
    getStats() {
        const totalNotes = this.notes.length;
        const totalWords = this.notes.reduce((count, note) => 
            count + note.content.split(/\s+/).length, 0
        );
        
        return { totalNotes, totalWords };
    }

    // Falling Mist Animation
    createFallingMist() {
        const leavesContainer = document.getElementById('leavesContainer');
        
        // Create initial mist elements
        for (let i = 0; i < 15; i++) {
            this.createMistElement();
        }

        // Create new mist element every 3 seconds
        setInterval(() => {
            this.createMistElement();
        }, 3000);
    }

    createMistElement() {
        const leavesContainer = document.getElementById('leavesContainer');
        const mistElement = document.createElement('div');
        mistElement.className = 'leaf';
        mistElement.textContent = this.preWinterEmojis[Math.floor(Math.random() * this.preWinterEmojis.length)];
        
        // Random position and animation
        mistElement.style.left = Math.random() * 100 + '%';
        mistElement.style.animationDuration = (Math.random() * 3 + 5) + 's'; // 5-8 seconds
        mistElement.style.animationDelay = Math.random() * 2 + 's';
        
        leavesContainer.appendChild(mistElement);
        
        // Remove element after animation
        setTimeout(() => {
            if (mistElement.parentNode) {
                mistElement.parentNode.removeChild(mistElement);
            }
        }, 8000);
    }

    // Welcome Message
    showWelcomeMessage() {
        if (!localStorage.getItem('preWinterNotesWelcome')) {
            setTimeout(() => {
                this.showToast('Welcome to Pre Winter Notes! Capture your thoughts as seasons change 🌫️', 'success');
                localStorage.setItem('preWinterNotesWelcome', 'true');
            }, 1000);
        }
        
        // Load draft if exists
        this.loadDraft();
    }

    // Search Notes
    searchNotes(query) {
        const filtered = this.notes.filter(note => 
            note.content.toLowerCase().includes(query.toLowerCase())
        );
        
        const notesList = document.getElementById('notesList');
        if (filtered.length === 0) {
            notesList.innerHTML = `
                <div class="empty-state">
                    <p>🌫️ No notes found...</p>
                    <p>Try a different search term</p>
                </div>
            `;
            return;
        }

        notesList.innerHTML = filtered.map(note => `
            <div class="note-card" data-id="${note.id}">
                <div class="note-header">
                    <span class="note-emoji">${note.emoji}</span>
                    <span class="note-date">${this.formatDate(note.timestamp)}</span>
                    <button class="delete-btn" onclick="preWinterNotes.deleteNote('${note.id}')">
                        ×
                    </button>
                </div>
                <div class="note-content">
                    ${this.formatNoteContent(note.content)}
                </div>
            </div>
        `).join('');
    }

    // Clear All Notes
    clearAllNotes() {
        if (confirm('Are you sure you want to delete all notes? This cannot be undone.')) {
            this.notes = [];
            this.saveNotesToStorage();
            this.displayNotes();
            this.showToast('All notes cleared! 💨', 'info');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.preWinterNotes = new PreWinterNotes();
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N - New note (focus input)
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        document.getElementById('noteInput').focus();
    }
    
    // Ctrl/Cmd + E - Export notes
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        preWinterNotes.exportNotes();
    }
});
