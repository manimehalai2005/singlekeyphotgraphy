import DriftWall from "./Driffttwall";


const items = [
  { image: 'https://picsum.photos/id/1015/600/400', title: 'Peaks', href: 'https://example.com/one' },
  { image: 'https://picsum.photos/id/1025/600/400', title: 'Pup', href: 'https://example.com/two' },
  { image: 'https://picsum.photos/id/1039/600/400', title: 'Falls', href: 'https://example.com/three' },
  { image: 'https://picsum.photos/id/1043/600/400', title: 'Forest', href: 'https://example.com/four' },
  { image: 'https://picsum.photos/id/1050/600/400', title: 'Road', href: 'https://example.com/five' },
];

export default function Dirftpage() {
  return (
    <main className="relative flex h-screen w-full items-center justify-center bg-black overflow-hidden">
      <div className="h-[600px] w-full max-w-7xl">
        <DriftWall
          items={items}
          columns={5}
          tileWidth={200}
          tileHeight={132}
          gap={18}
          tilt={16}
          turn={-14}
          perspective={1200}
          depth={120}
          speed={42}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={0.55}
          overlayColor="#060010"
        />
      </div>
    </main>
  );
}