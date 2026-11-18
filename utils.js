/**
 * Utility functions for PDF operations
 */

const Utils = {
    /**
     * Show error message
     */
    showError(message) {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 5000);
    },
    
    /**
     * Validate file type
     */
    validateFileType(file, types) {
        if (!file) return false;
        
        if (types.includes('pdf') && file.type === 'application/pdf') {
            return true;
        }
        
        if (types.includes('image') && file.type.startsWith('image/')) {
            return true;
        }
        
        return false;
    },
    
    /**
     * Create preview image for file
     */
    createPreviewImage(fileOrBlob, title) {
        const container = document.createElement('div');
        container.className = 'preview-item';
        
        const img = document.createElement('img');
        img.alt = title || 'Preview';
        
        if (fileOrBlob instanceof Blob) {
            img.src = URL.createObjectURL(fileOrBlob);
        } else {
            img.src = URL.createObjectURL(fileOrBlob);
        }
        
        container.appendChild(img);
        
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.textContent = title || 'Preview';
        container.appendChild(overlay);
        
        return container;
    },
    
    /**
     * Create download link
     */
    createDownloadLink(blob, filename, linkText) {
        const link = document.createElement('a');
        link.className = 'download-btn';
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.textContent = linkText || 'Download';
        return link;
    },
    
    /**
     * Create download link with improved styling
     */
    createDownloadLink(blob, filename, text) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.className = 'download-btn';
        link.textContent = text || `Download ${filename}`;
        
        // Add appropriate icon based on file type
        if (filename.endsWith('.pdf')) {
            link.innerHTML = `📄 ${text || `Download ${filename}`}`;
        } else if (filename.endsWith('.txt')) {
            link.innerHTML = `📝 ${text || `Download ${filename}`}`;
        } else if (filename.endsWith('.zip')) {
            link.innerHTML = `📦 ${text || `Download ${filename}`}`;
        } else if (/\.(jpe?g|png|gif|bmp|webp)$/i.test(filename)) {
            link.innerHTML = `🖼️ ${text || `Download ${filename}`}`;
        } else {
            link.innerHTML = `⬇️ ${text || `Download ${filename}`}`;
        }
        
        link.addEventListener('click', function() {
            setTimeout(() => URL.revokeObjectURL(link.href), 100);
        });
        
        return link;
    },
    
    /**
     * Format file size with appropriate units
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    /**
     * Create badge for premium features
     */
    createPremiumBadge() {
        const badge = document.createElement('span');
        badge.className = 'premium-badge';
        badge.textContent = 'Premium';
        return badge;
    },
    
    /**
     * Create text preview with sample data
     */
    createTextPreview(text, maxLength = 500) {
        const preview = document.createElement('div');
        preview.className = 'text-preview';
        
        const heading = document.createElement('h4');
        heading.textContent = 'Text Preview';
        
        const preElement = document.createElement('pre');
        // Truncate long text
        preElement.textContent = text.length > maxLength ? 
            text.substring(0, maxLength) + '...' : 
            text;
        
        preview.appendChild(heading);
        preview.appendChild(preElement);
        
        return preview;
    }
};
