import styles from './TimelineItem.module.css';

export interface TimelineItem {
    id: number;
    start: string;
    end: string;
    name: string;
    color: string;
}

interface TimelineItemComponentProps {
    item: TimelineItem;
    startDate: Date;
    totalDuration: number;
    laneIndex: number;
}

export default function TimelineItemComponent({ 
    item, 
    startDate, 
    totalDuration, 
    laneIndex 
}: TimelineItemComponentProps) {
    const itemStart = new Date(item.start);
    const itemEnd = new Date(item.end);
    
    const leftPercent = ((itemStart.getTime() - startDate.getTime()) / totalDuration) * 100;
    const widthPercent = ((itemEnd.getTime() - itemStart.getTime()) / totalDuration) * 100;
    
    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };
    
    const displayDateRange = item.start === item.end 
        ? formatDate(itemStart)
        : `${formatDate(itemStart)} - ${formatDate(itemEnd)}`;

    return (
        <div
            className={`${styles.timelineItem}`}
            style={{
                left: `${leftPercent}%`,
                width: `${Math.max(widthPercent, 5)}%`,
                top: `${laneIndex * 60}px`,
                backgroundColor: item.color,
            }}
        >
            <div className={styles.itemName}>
                {item.name}
            </div>
            <div className={styles.itemDate}>
                {displayDateRange}
            </div>
        </div>
    );
}

