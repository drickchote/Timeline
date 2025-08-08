import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect, useRef, useState } from "react";
import type { TimelineItem } from "./TimelineItem";
import TimelineItemComponent from "./TimelineItem";
import NavigationControl from "./NavigationControl";
import { assignLanes } from "../../utils/assignLanes";
import styles from "./Timeline.module.css";

type TimelineProps = {
    title: string;
    subtitle: string;
    items: TimelineItem[];
}

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const PX_PER_DAY = 20;

export default function Timeline({ title, subtitle, items }: TimelineProps) {
    const lanes = assignLanes(items);
    const [currentView, setCurrentView] = useState(0);
    const barRef = useRef<any>(null);

    const allDates = items.flatMap(item => [new Date(item.start), new Date(item.end)]);
    const startDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const endDate = new Date(Math.max(...allDates.map(d => d.getTime())));
    const totalDuration = endDate.getTime() - startDate.getTime();
    
    const goToStart = () => setCurrentView(0);
    const goToEnd = () => setCurrentView(100);
    const goBack = () => setCurrentView(Math.max(0, currentView - 25));
    const goForward = () => setCurrentView(Math.min(100, currentView + 25));

    useEffect(() => {
        const el: HTMLElement | null = barRef.current?.getScrollElement?.();
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        el.scrollTo({ left: (currentView / 100) * max, behavior: 'smooth' });
      }, [currentView]);

 

    const contentWidth = Math.max(
        800,
        Math.ceil(totalDuration / MILLISECONDS_PER_DAY) * PX_PER_DAY 
    );

    return (
        <div className={styles.timeline}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <p className={styles.subtitle}>
                    {subtitle}
                </p>
            </div>

            <div 
                className={styles.timelineContainer}
                style={{ 
                    minHeight: `${lanes.length * 60 + 40}px`
                }}
            >
                <SimpleBar 
                    ref={barRef}
                    className={styles.scrollbar}
                    style={{ 
                        height: `${lanes.length * 60 + 40}px`
                    }}
                    autoHide={false}
                >
                    <div 
                        className={styles.content}
                        style={{ 
                            width: `${contentWidth}px`, 
                            height: `${lanes.length * 60}px`
                        }}
                    >
                        {lanes.map((lane, laneIndex) =>
                            lane.map(item => (
                                <TimelineItemComponent
                                    key={item.id}
                                    item={item}
                                    startDate={startDate}
                                    totalDuration={totalDuration}
                                    laneIndex={laneIndex}
                                />
                            ))
                        )}
                    </div>
                </SimpleBar>
            </div>

            <NavigationControl
                onGoToStart={goToStart}
                onGoBack={goBack}
                onGoForward={goForward}
                onGoToEnd={goToEnd}
            />
        </div>
    );
}