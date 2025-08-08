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
const MIN_CONTENT_WIDTH = 800;
const LANE_HEIGHT = 60;
const TIMELINE_PADDING = 40;

export default function Timeline({ title, subtitle, items }: TimelineProps) {
    const lanes = assignLanes(items);
    const barRef = useRef<any>(null);

    const allDates = items.flatMap(item => [new Date(item.start), new Date(item.end)]);
    const startDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const endDate = new Date(Math.max(...allDates.map(d => d.getTime())));
    const totalDuration = endDate.getTime() - startDate.getTime();
    
    const goToStart = () => {
        const el: HTMLElement | null = barRef.current?.getScrollElement?.();
        if (!el) return;
        el.scrollTo({ left: 0, behavior: 'smooth' });
    };
    
    const goToEnd = () => {
        const el: HTMLElement | null = barRef.current?.getScrollElement?.();
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        el.scrollTo({ left: max, behavior: 'smooth' });
    };
    
    const goBack = () => {
        const el: HTMLElement | null = barRef.current?.getScrollElement?.();
        if (!el) return;
        const stepSize = el.clientWidth * 0.25;
        el.scrollTo({ left: el.scrollLeft - stepSize, behavior: 'smooth' });
    };
    
    const goForward = () => {
        const el: HTMLElement | null = barRef.current?.getScrollElement?.();
        if (!el) return;
        const stepSize = el.clientWidth * 0.25; 
        el.scrollTo({ left: el.scrollLeft + stepSize, behavior: 'smooth' });
    };

    const contentWidth = Math.max(
        MIN_CONTENT_WIDTH,
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
                    minHeight: `${lanes.length * LANE_HEIGHT + TIMELINE_PADDING}px`
                }}
            >
                <SimpleBar 
                    ref={barRef}
                    className={styles.scrollbar}
                    style={{ 
                        height: `${lanes.length * LANE_HEIGHT + TIMELINE_PADDING}px`
                    }}
                    autoHide={false}
                >
                    <div 
                        className={styles.content}
                        style={{ 
                            width: `${contentWidth}px`, 
                            height: `${lanes.length * LANE_HEIGHT}px`
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