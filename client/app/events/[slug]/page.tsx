import event1 from '../../../images/nosactions.jpg'; // replace with your actual image path
import nosActionsImage from '../../../images//event.jpg'; // replace with your actual image path
import {
  CalendarDays,
  Clock3,
  Globe,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static event data – swap this out for a DB/API call later          */
/* ------------------------------------------------------------------ */
const event = {
  slug: "les-journees-virtuelles-de-margoum",
  title: "Les Journées Virtuelles De Margoum",
  date: "19 – 20 Février 2025",
  time: "Toute la journée",
  status: "Expiré",
  image: nosActionsImage.src,
  description: [
    "<strong>Les Journées Virtuelles De Margoum</strong> sont un voyage immersif à travers l'artisanat traditionnel tunisien, mettant en lumière le margoum, un tapis emblématique du patrimoine culturel du pays.",
    "Cet événement virtuel invite les participants à découvrir les techniques ancestrales de tissage, l'histoire du margoum, ainsi que son rôle central dans la culture tunisienne.",
    "À travers des conférences, des démonstrations en ligne et des ateliers interactifs, cet événement met en valeur ce chef-d'œuvre de l'artisanat tunisien, symbole de beauté, de savoir-faire et de résilience.",
    "Ne manquez pas cette occasion unique de plonger dans l'univers fascinant du margoum et de célébrer un art qui traverse les générations.",
  ],
  // Event details sidebar
  speaker: "flen ben flen",
  location: "12 Habib Bourguiba, Tunis",
  horaire: "0h00 – 0h00",
  // Organiser sidebar
  organizerName: "felten",
  organizerPhone: "71 000 000",
  organizerEmail: "info@tamaguit.org",
  organizerWebsite: "tamaguit.com",
};

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function EventDetailPage() {
  return (
    <div>

      {/* ---- Hero ---- */}
      <div className="edp-hero">
        <img className="edp-hero-img" src={event.image} alt={event.title} />
        <div className="edp-hero-overlay" />
        <div className="edp-hero-content">
          <div className="edp-hero-badges">
            <span className="edp-badge-date">
              <CalendarDays size={14} /> {event.date}
            </span>
            <span className="edp-badge-time">
              <Clock3 size={14} /> {event.time}
            </span>
            <span className="edp-badge-expired">{event.status}</span>
          </div>
          <h1 className="edp-hero-title">{event.title}</h1>
        </div>
      </div>

      {/* ---- Body ---- */}
      <div className="edp-body">

        {/* Left column */}
        <div className="edp-main">
          <h2 className="edp-section-title">À propos de l'événement</h2>

          {event.description.map((para, i) => (
            <p
              key={i}
              className="edp-text"
              dangerouslySetInnerHTML={{ __html: para }}
            />
          ))}

          <img
            className="edp-poster"
            src={event1.src}
            alt={`Affiche – ${event.title}`}
          />
        </div>

        {/* Right sidebar */}
        <div className="edp-sidebar">

          {/* Détails de l'événement */}
          <div className="edp-card">
            <h3 className="edp-card-title">Détails de l'événement</h3>
            <div className="edp-info-list">
              <div className="edp-info-row">
                <div className="edp-info-icon"><UserRound size={16} color="#5bbfaa" /></div>
                <div className="edp-info-text">
                  <span className="edp-info-label">Intervenant</span>
                  <span className="edp-info-value">{event.speaker}</span>
                </div>
              </div>
              <div className="edp-info-row">
                <div className="edp-info-icon"><CalendarDays size={16} color="#5bbfaa" /></div>
                <div className="edp-info-text">
                  <span className="edp-info-label">Date</span>
                  <span className="edp-info-value">{event.date}</span>
                </div>
              </div>
              <div className="edp-info-row">
                <div className="edp-info-icon"><MapPin size={16} color="#5bbfaa" /></div>
                <div className="edp-info-text">
                  <span className="edp-info-label">Lieu</span>
                  <span className="edp-info-value">{event.location}</span>
                </div>
              </div>
              <div className="edp-info-row">
                <div className="edp-info-icon"><Clock3 size={16} color="#5bbfaa" /></div>
                <div className="edp-info-text">
                  <span className="edp-info-label">Horaire</span>
                  <span className="edp-info-value">{event.horaire}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organisateur */}
          <div className="edp-card">
            <h3 className="edp-card-title">Organisateur</h3>
            <div className="edp-info-list">
              <div className="edp-info-row">
                <div className="edp-info-icon"><UserRound size={16} color="#5bbfaa" /></div>
                <div className="edp-info-text">
                  <span className="edp-info-label">Nom</span>
                  <span className="edp-info-value">{event.organizerName}</span>
                </div>
              </div>
              <div className="edp-info-row">
                <div className="edp-info-icon"><Phone size={16} color="#5bbfaa" /></div>
                <div className="edp-info-text">
                  <span className="edp-info-label">Téléphone</span>
                  <span className="edp-info-value">{event.organizerPhone}</span>
                </div>
              </div>
              <div className="edp-info-row">
                <div className="edp-info-icon"><Mail size={16} color="#5bbfaa" /></div>
                <div className="edp-info-text">
                  <span className="edp-info-label">Email</span>
                  <span className="edp-info-value">
                    <a href={`mailto:${event.organizerEmail}`}>{event.organizerEmail}</a>
                  </span>
                </div>
              </div>
              <div className="edp-info-row">
                <div className="edp-info-icon"><Globe size={16} color="#5bbfaa" /></div>
                <div className="edp-info-text">
                  <span className="edp-info-label">Site web</span>
                  <span className="edp-info-value">
                    <a href={`https://${event.organizerWebsite}`} target="_blank" rel="noreferrer">
                      {event.organizerWebsite}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <button className="edp-contact-btn">Nous Contacter</button>
          </div>

        </div>
      </div>
    </div>
  );
}