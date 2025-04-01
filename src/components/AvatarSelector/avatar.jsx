// Avatar.jsx
import React, { useEffect, useState } from 'react';
import { storage } from '../../firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const AvatarSelector = ({ onSelect }) => {
    const [avatars, setAvatars] = useState([]);
    const [loading, setLoading] = useState(true); // Estado modificable

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                // Asegurar la ruta correcta con '/'
                const storageRef = ref(storage, 'avatars/'); // Barra final importante
                const res = await listAll(storageRef);

                console.log('Archivos encontrados:', res.items);

                // Validar y obtener URLs
                const validItems = res.items.filter(item => item.name.endsWith('.png'));
                const urls = await Promise.all(
                    validItems.map(itemRef => getDownloadURL(itemRef))
                );

                setAvatars(urls);
            } catch (error) {
                console.error("Error cargando avatares:", error);
            } finally {
                setLoading(false); // Actualizar estado de carga
            }
        };
        fetchAvatars();
    }, []);

    if (loading) return <div>Cargando avatares...</div>;
    if (avatars.length === 0) return <div>No se encontraron avatares</div>;

    return (
        <div className="avatar-modal-grid">
            {avatars.map((url, index) => (
                <img
                    key={index}
                    src={url}
                    alt={`Avatar ${index + 1}`}
                    className="avatar-option"
                    onClick={() => onSelect(url)}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        console.error('Error cargando avatar:', url);
                    }}
                />
            ))}
        </div>
    );
};

export default AvatarSelector;