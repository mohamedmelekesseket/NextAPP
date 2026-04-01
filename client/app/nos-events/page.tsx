
import Link from "next/link";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import nosActionsImage from "../../images/nosactions.jpg";

const events = [
  {
    id: 1,
    slug: "les-journees-virtuelles-de-margoum",
    day: "19",
    month: "FÉV",
    range: "-20",
    badge: "Expired",
    image: nosActionsImage.src,
    date: "19 February 2025 - 20 February 2025",
    title: "Les Journées Virtuelles de Margoum",
    description:
      "Les Journées Virtuelles de Margoum sont un voyage immersif à travers l'artisanat traditionnel tunisien, mettant en lumière le margoum, un tapis emblématique du patrimoine culturel du pays.",
    location: "12 Hbib Bourguiba, Tunis",
    time: "0h00 - 0h00",
  },
];

function EventCard({ event }: { event: typeof events[0] }) {
  return (
    <div className="event-card">
      <div className="event-card-top">
        <div className="event-card-image-wrapper">
          <img className="event-card-image" src={event.image} alt={event.title} />
          <div className="event-date-badge">
            <div className="event-date-badge-month">{event.month}</div>
            <div className="event-date-badge-day">{event.day}</div>
            <div className="event-date-badge-range">{event.range}</div>
          </div>
        </div>
        <div className="event-type-badge">{event.badge}</div>
      </div>

      <div className="event-card-body">
        <h2 className="event-card-title">{event.title}</h2>
        <p className="event-card-description">{event.description}</p>

        <div className="event-card-meta">
          <div className="event-card-meta-row">
            <CalendarDays size={16} color="#5bbfaa" />
            <span>{event.date}</span>
          </div>
          <div className="event-card-meta-row">
            <MapPin size={16} color="#5bbfaa" />
            <span>{event.location}</span>
          </div>
          <div className="event-card-meta-row">
            <Clock3 size={16} color="#5bbfaa" />
            <span>{event.time}</span>
          </div>
        </div>
        <Link className="event-card-btn" href={`/events/${event.slug}`}>
          Voir les détails
        </Link>
      </div>
    </div>
  );
}

export default function NosEventsPage() {
  return (
    <div>
      <div className="events-hero">
        <div className="events-hero-triangle" />
        <h1 className="events-hero-title">Archives: Events</h1>
        <p className="events-hero-breadcrumb">TAMAGUIT &gt; EVENTS</p>
      </div>

      <div className="events-section">
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}