import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect, useRef, useState } from "react";
import type { TimelineItem } from "./TimelineItem";
import TimelineItemComponent from "./TimelineItem";
import { assignLanes } from "../../utils/assignLanes";

type TimelineProps = {
    title: string;
    subtitle: string;
    items: TimelineItem[];
}


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

    const DAY = 24 * 60 * 60 * 1000;
    const PX_PER_DAY = 20;

    const contentWidth = Math.max(
        800,
        Math.ceil(totalDuration / DAY) * PX_PER_DAY 
    );

    return (
        <div style={{ 
            background: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{ 
                    margin: '0 0 4px 0',
                    fontSize: '24px',
                    fontWeight: '600'
                }}>
                    {title}
                </h2>
                <p style={{ 
                    margin: 0,
                    fontSize: '14px',
                    opacity: 0.8
                }}>
                    {subtitle}
                </p>
            </div>

            <div style={{ 
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                minHeight: `${lanes.length * 60 + 40}px`,
                position: 'relative'
            }}>
                <SimpleBar 
                    ref={barRef}
                    style={{ 
                        height: `${lanes.length * 60 + 40}px`,
                        width: '800px'
                    }}
                    autoHide={false}
                >
                    <div style={{ 
                        position: 'relative',
                        width: `${contentWidth}px`, 
                        height: `${lanes.length * 60}px`,
                        padding: '10px 0'
                    }}>
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

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px'
            }}>
                <button
                    onClick={goToStart}
                    style={{
                        background: '#8B5CF6',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#7C3AED';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#8B5CF6';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Start
                </button>
                
                <button
                    onClick={goBack}
                    style={{
                        background: 'transparent',
                        border: '2px solid #4A5568',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#6B7280';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#4A5568';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    ← Back
                </button>

                <button
                    onClick={goForward}
                    style={{
                        background: 'transparent',
                        border: '2px solid #4A5568',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#6B7280';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#4A5568';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Forward →
                </button>

                <button
                    onClick={goToEnd}
                    style={{
                        background: '#8B5CF6',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#7C3AED';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#8B5CF6';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    End
                </button>
            </div>
        </div>
    );
}